import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaService } from 'src/prisma.service';

dayjs.locale('en');

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getMainStatistics(storeId: string) {
    const totalRevenue = await this.calculateTotalRevenue(storeId);
    const productsCount = await this.countProducts(storeId);

    const categoriesCount = await this.countCategories(storeId);

    const averageRating = await this.calculateAverageRating(storeId);

    return [
      { id: 1, name: 'Total Revenue', value: `${totalRevenue.toFixed(2)}` },
      { id: 2, name: 'Products', value: productsCount },
      { id: 3, name: 'Categories', value: categoriesCount },
      { id: 4, name: 'Average Rating', value: averageRating?.toFixed(1) },
    ];
  }

  async getMiddleStatistics(storeId: string) {
    const monthlySales = await this.calculateMonthlySales(storeId);

    const lastUsers = await this.getLastUsers(storeId);

    return {
      monthlySales,
      lastUsers,
    };
  }

  private async calculateTotalRevenue(storeId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        items: {
          some: {
            storeId: storeId,
          },
        },
      },
      include: {
        items: {
          where: {
            storeId: storeId,
          },
        },
      },
    });

    const totalRevenue = orders.reduce((sum, order) => {
      const orderTotal = order.items.reduce(
        (itemSum, item) => itemSum + item.price * item.quantity,
        0,
      );
      return sum + orderTotal;
    }, 0);
    return totalRevenue;
  }

  private async countProducts(storeId: string) {
    const productsCount = await this.prisma.product.count({
      where: { storeId },
    });
    return productsCount;
  }

  private async countCategories(storeId: string) {
    const categories = await this.prisma.category.count({
      where: { storeId },
    });
    return categories;
  }

  private async calculateAverageRating(storeId: string) {
    const averageRating = await this.prisma.review.aggregate({
      where: { storeId },
      _avg: { rating: true },
    });
    return averageRating._avg.rating;
  }

  private async calculateMonthlySales(storeId: string) {
    const startDate = dayjs().subtract(30, 'days').startOf('day').toDate();
    const endDate = dayjs().endOf('day').toDate();

    const salesRaw = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        items: {
          some: {
            storeId: storeId,
          },
        },
      },
      include: {
        items: true,
      },
    });

    const formatDate = (date: Date) =>
      `${date.getDate()} ${monthNames[date.getMonth()]}`;

    const salesByDate = new Map<string, number>();

    salesRaw.forEach((order) => {
      const formattedDate = formatDate(new Date(order.createdAt));

      const total = order.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      salesByDate.set(
        formattedDate,
        (salesByDate.get(formattedDate) || 0) + total,
      );
    });

    return Array.from(salesByDate, ([date, total]) => ({ date, total }));
  }

  private async getLastUsers(storeId: string) {
    const lastUsers = await this.prisma.user.findMany({
      where: {
        orders: {
          some: {
            items: {
              some: {
                storeId,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        orders: {
          where: {
            items: {
              some: {
                storeId,
              },
            },
          },
          include: {
            items: {
              where: {
                storeId,
              },
              select: { price: true },
            },
          },
        },
      },
    });

    return lastUsers.map((user) => {
      const lastOrder = user.orders[user.orders.length - 1];

      const total = lastOrder.items.reduce((sum, item) => sum + item.price, 0);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        total,
      };
    });
  }
}
