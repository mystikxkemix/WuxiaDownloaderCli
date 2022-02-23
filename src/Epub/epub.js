const epub = require('epub-gen')

const test = () => {
    const options = {
        title: 'Moby-Dick',
        author: 'Herman Melville',
        output: './moby-dick.epub',
        content: [
            {
                title: 'Chapter 1: Loomings',
                data: `<p>
              Call me Ishmael. Some years ago—never mind how long precisely
            </p>`,
            },
        ],
    }
}

const exportEpub = (title, author, publisher, output, content) => {
    const options = {
        title,
        author,
        publisher,
        content,
        output: './outputs/' + output,
    }

    return new epub(options).promise
        .then(() => {
            console.log('Done', output)
            return output
        })
        .catch((err) => {
            console.log('Error', err)
            return output
        })
}

export default {
    test,
    exportEpub,
}
