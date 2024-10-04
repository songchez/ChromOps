import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.POSTGRES_PRISMA_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });
export default prisma;

// 이 코드는 Prisma 클라이언트를 설정하고 Neon 데이터베이스에 연결하는 데 사용됩니다.
// 주요 구성 요소:
// 1. 필요한 모듈 가져오기
// 2. dotenv를 사용하여 환경 변수 로드
// 3. Neon 웹소켓 구성
// 4. 데이터베이스 연결 문자열 설정
// 5. 연결 풀 생성
// 6. Prisma Neon 어댑터 생성
// 7. Prisma 클라이언트 인스턴스화
//
// 이 설정을 통해 애플리케이션은 Neon 데이터베이스와 효율적으로 상호 작용할 수 있습니다.
