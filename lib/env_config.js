import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootPath = path.join(__dirname, '..');

// 애플리케이션 실행 하면서 설정한 ENV_NAME 값 우선 사용, 존재하지 않을 경우 .env 사용
const envPath = process.env.ENV_NAME || '.env';
process.env.IS_SET || dotenv.config({ path : path.join(__rootPath, envPath) });

export default null;