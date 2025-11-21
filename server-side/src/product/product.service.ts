import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.getSearchTermFilter(searchTerm);
    }

    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return products;
  }

  private async getSearchTermFilter(searchTerm: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async getByStoreId(storeId: string) {
    return this.prisma.product.findMany({
      where: {
        storeId,
      },
      include: {
        category: true,
        color: true,
      },
    });
  }

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        color: true,
        reviews: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async getByCategory(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          id: categoryId,
        },
      },
      include: {
        category: true,
      },
    });

    if (!products) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async getMostPopular() {
    const mostPopularProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _count: { id: true },
      orderBy: {
        _count: { id: 'desc' },
      },
    });

    const productIds = mostPopularProducts.map((item) => item.productId);

    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    return products;
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getById(id);

    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    }

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          title: currentProduct.category?.title,
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return products;
  }

  async create(storeId: string, dto: ProductDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!categoryExists) {
      throw new BadRequestException('Category not found');
    }

    const colorExists = await this.prisma.color.findUnique({
      where: { id: dto.colorId },
    });

    if (!colorExists) {
      throw new BadRequestException('Color not found');
    }

    const storeExists = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!storeExists) {
      throw new NotFoundException('Store not found');
    }

    return this.prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        images: dto.images,
        categoryId: dto.categoryId,
        colorId: dto.colorId,
        storeId,
      },
      include: {
        category: true,
        color: true,
      },
    });
  }

  async update(id: string, dto: ProductDto) {
    await this.getById(id);

    return this.prisma.product.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    await this.getById(id);

    const orderItemsCount = await this.prisma.orderItem.count({
      where: {
        productId: id,
      },
    });

    if (orderItemsCount > 0) {
      throw new ConflictException(
        `Cannot delete product. It is used in ${orderItemsCount} order(s).`,
      );
    }

    await this.prisma.review.deleteMany({
      where: {
        productId: id,
      },
    });

    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
