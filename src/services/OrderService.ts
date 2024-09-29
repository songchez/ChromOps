import { prisma } from "@/lib/prisma";

//서버로 들어온 결제 데이터와 실제 결제데이터 비교하는 함수

export class OrderService {
  static async getOrderData(orderId: string) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        throw new Error("주문을 찾을 수 없습니다");
      }

      const totalAmount = order.items.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);

      return {
        id: order.id,
        userId: order.userId,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        amount: totalAmount,
        items: order.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };
    } catch (error) {
      console.error("주문 데이터 가져오기 오류:", error);
      throw error;
    }
  }

  static async updateOrderStatus(orderId: string, status: string) {
    try {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status: status },
      });

      return updatedOrder;
    } catch (error) {
      console.error("주문 상태 업데이트 오류:", error);
      throw error;
    }
  }

  static async createOrder(
    userId: string,
    items: { productId: string; quantity: number }[]
  ) {
    try {
      const order = await prisma.order.create({
        data: {
          userId,
          totalAmount: 0, // 초기값 설정
          items: {
            create: await Promise.all(
              items.map(async (item) => {
                const product = await prisma.product.findUnique({
                  where: { id: item.productId },
                });
                if (!product)
                  throw new Error(`상품을 찾을 수 없습니다: ${item.productId}`);
                return {
                  productId: item.productId,
                  quantity: item.quantity,
                  price: product.price,
                };
              })
            ),
          },
        },
        include: {
          items: true,
        },
      });

      // 총 금액 계산 및 업데이트
      const totalAmount = order.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      await prisma.order.update({
        where: { id: order.id },
        data: { totalAmount },
      });

      return order;
    } catch (error) {
      console.error("주문 생성 오류:", error);
      throw error;
    }
  }
}
