// i18n/utils.js
import fs from 'fs';
import path from 'path';

/**
 * 加载指定语言的所有消息
 * @param {string} locale - 语言代码 (en, zh, fr)
 * @returns {Promise<Object>} - 合并后的消息对象
 */
export async function loadMessages(locale) {
	const localeDir = path.join(process.cwd(), 'i18n', 'locales', locale);

	// 读取语言目录中的所有文件
	const fileNames = fs.readdirSync(localeDir);

	// 只处理 JSON 文件
	const jsonFiles = fileNames.filter(file => file.endsWith('.json'));

	// 加载并合并所有 JSON 文件
	const messages = {};

	for (const file of jsonFiles) {
		const filePath = path.join(localeDir, file);
		const fileContent = await import(filePath);
		const namespace = file.replace('.json', '');

		messages[namespace] = fileContent.default;
	}

	return messages;
}

/**
 * 获取支持的语言列表
 * @returns {string[]} - 支持的语言代码数组
 */
export function getSupportedLocales() {
	const localesDir = path.join(process.cwd(), 'i18n', 'locales');
	return fs.readdirSync(localesDir).filter(file =>
		fs.statSync(path.join(localesDir, file)).isDirectory()
	);
}
