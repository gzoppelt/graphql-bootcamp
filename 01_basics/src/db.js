// Demo data
const users = [
    {
        id: '1',
        name: 'Guenther',
        email: 'guenther@example.com',
        age: 93
    },
    {
        id: '2',
        name: 'Gordon',
        email: 'gordon@example.com'
    },
    {
        id: '3',
        name: 'Mike',
        email: 'mike@example.com',
        age: 17
    }
]

const posts = [
    {
        id: 'p1',
        title: 'Das is Post 1',
        body: 'Ich glaub das nicht.',
        published: true,
        author: '1'
    },
    {
        id: 'p2',
        title: 'Das is Post 2',
        body: 'Der Post ist doof.',
        published: true,
        author: '1'
    },
    {
        id: 'p3',
        title: 'Das is Post 3',
        body: 'Die spinnen wohl?',
        published: true,
        author: '2'
    },
    {
        id: 'p4',
        title: 'Das is Post 4',
        body: 'Bei "das" kommen alle Posts.',
        published: true,
        author: '3'
    }
]

const comments = [
    {
        id: 'c1',
        text: 'Das ist comment 1 von author 1',
        author: '1',
        post: 'p1'
    },
    {
        id: 'c2',
        text: 'Das ist comment 2 von post mit author 1',
        author: '3',
        post: 'p2'
    },
    {
        id: 'c3',
        text: 'Das ist comment 3',
        author: '3',
        post: 'p3'
    },
    {
        id: 'c4',
        text: 'Das ist comment 4',
        author: '3',
        post: 'p4'
    }
]

const db = {
    users,
    posts,
    comments
}

export default db;