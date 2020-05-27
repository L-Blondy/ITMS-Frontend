import * as SRC from '/assets/icons/fileTypes';

function getAttachmentIconSRC(file) {
	const { mimetype, name } = file;
	if (mimetype.includes('image'))
		return SRC.image;
	if (mimetype.includes('pdf'))
		return SRC.pdf;
	if (mimetype.includes('zip') || name.endsWith('rar'))
		return SRC.archive;
	if (mimetype.includes('text'))
		return SRC.all;
}

export default getAttachmentIconSRC;