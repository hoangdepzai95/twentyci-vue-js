const DELAY = 250;
const DB_KEY = 'mock-db';

class MockApi {

    subscriptions = [];

    constructor() {
        if (!localStorage.getItem('didInit')) {
            this.initData();
        }
    }

    subscribe(fn) {
        if (typeof fn === 'function') {
            this.subscriptions.push(fn);
        }
    }

    emitLoadingSate(loading) {
        for (let sub of this.subscriptions) {
            sub(loading);
        }
    }

    getPosts() {
        return this.doRequest(this.getLocalPosts());
    }

    getPost(id) {
        const posts = this.getLocalPosts();

        return this.doRequest(posts.find((post) => post.id === id) || {});
    }

    deletePost(id){
        const posts = this.getLocalPosts().filter((post) => post.id !== id);

        this.savePosts(posts);

        return this.doRequest(null);
    }

    editPost(id, title, content) {
        const posts = this.getLocalPosts();

        posts.forEach((post) => {
            if (post.id === id) {
                post.title = title;
                post.content = content;
            }
        });

        this.savePosts(posts);

        return this.doRequest(null);
    }

    createPost(title, content) {
        const posts = this.getLocalPosts();

        const id = this.maxBy(posts, 'id') + 1;
        posts.unshift({
            id,
            title,
            content
        });

        this.savePosts(posts);
        return this.doRequest(null);

    }

    login(userName, password) {
        if (userName === 'demo' && password === 'demo') {
            return this.doRequest({ token: 'token' });
        } else {
            return this.doRequest({ wrongInfo: true }, true);
        }
    }

    maxBy(arr, field) {
        return arr.map((o) => o[field]).reduce((a, b) => {
            return Math.max(a, b);
        });
    }

    savePosts(posts) {
        localStorage.setItem(DB_KEY, JSON.stringify(posts));
    }

    initData() {
        const posts = [
            {
                id: 1,
                title: 'My daughter (7) keeps getting touched inappropriately at school, school brushing it off (Washington)',
                content: 'On a near daily basis, my daughter (age 7) is getting groped by a boy at school. She says he typically does it when the class is lining up and when the teacher is not looking, or at recess. So far he has touched her butt, her chest, and proclaimed "we should have sex."\n' +
                    '\n' +
                    'We talked with the teacher, who said she would "keep an eye on things" to try and eliminate the opportunity for it to occur. This has not helped. We escalated to the principal, who was kind but essentially said it was up to my daughter to cause a scene and yell and scream to bring attention to the issue whenever it happens to try and deter it, but my daughter does not want to do this because she finds the situation embarrassing and doesn\'t want the attention. Not to mention, it\'s not actually addressing the issue.'
            },
            {
                id: 2,
                title: 'Trump plans to sign an executive order that would remove the right to citizenship for babies of non-citizens and unauthorized immigrants born on U.S. soil. Would you support such a decision, why/why not?',
                content: 'We talked with the teacher, who said she would "keep an eye on things" to try and eliminate the opportunity for it to occur. This has not helped. We escalated to the principal, who was kind but essentially said it was up to my daughter to cause a scene and yell and scream to bring attention to the issue whenever it happens to try and deter it, but my daughter does not want to do this because she finds the situation embarrassing and doesn\'t want the attention. Not to mention, it\'s not actually addressing the issue.'
            }
        ];

        localStorage.setItem(DB_KEY, JSON.stringify(posts));
        localStorage.setItem('didInit', '1');
    }

    doRequest(response, err = false){
        return new Promise( (resolve, reject) => {
            this.emitLoadingSate(true);

            setTimeout(() => {
                if (err) {
                    reject(response);
                } else {
                    resolve(response);
                }

                this.emitLoadingSate(false);
            }, DELAY);
        });
    }

    getLocalPosts()  {
        return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    }

}

export default new MockApi();
