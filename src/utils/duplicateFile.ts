export function duplicateFile(srcPath: string): string{
	const NEW_FILE_NAME_AFFIX = 'Duplicate'

	const dirPath = path.dirname(srcPath)
	const fileExtension = path.extname(srcPath)
	const fileName = path.basename(srcPath, fileExtension)
	const newPath = path.join(dirPath, fileName + NEW_FILE_NAME_AFFIX + fileExtension)

	fs.copyFileSync(srcPath, newPath)

	return newPath
}
