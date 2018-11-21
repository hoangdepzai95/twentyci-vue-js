<template>
    <div class="post-list">
        <div class="posts">
            <div class="tools">
                <button v-button="'primary'" @click="openCreateForm">Create post</button>
                <app-popup v-model="showCreateForm">
                    <post-form mode="create" :post="currentPost"></post-form>
                </app-popup>
            </div>
            <table>
                <thead>
                <tr>
                    <th class="large">Title</th>
                    <th class="large">Content</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td><router-link :to="'/post/' + post.id">{{ post.title | cutLongText }}</router-link></td>
                    <td>{{ post.content | cutLongText  }}</td>
                    <td>
                        <a @click="openEditForm(post)">Edit</a> | <a @click="deletePost(post.id)">Delete</a>
                        <app-popup v-model="showEditForm">
                            <post-form mode="edit" :post="currentPost"></post-form>
                        </app-popup>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from '../../mocks/mock-api';
import PostForm from './PostForm.vue';

export default {
    name: 'PostList',
    components: {
      'post-form': PostForm
    },

    data: () => {
        return {
            posts: [],
            showCreateForm: false,
            showEditForm: false,
            currentPost: {}
        }
    },

    created() {
        this.getPosts();
    },

    methods: {
        getPosts() {
            api.getPosts()
                .then((posts) => {
                    this.posts = posts;
                });
        },

        deletePost(id) {
            if (confirm('Do you want to delete this post?')) {
                api.deletePost(id)
                    .then(() => {
                        this.getPosts();
                    });
            }
        },

        openEditForm(post) {
            this.currentPost = post;
            this.showEditForm = true;
        },

        openCreateForm() {
            this.currentPost = {};
            this.showCreateForm = true;
        }
    }
}
</script>

<style scoped lang="scss">
    .post-list {
        padding: 84px 20px 0 20px;
        display: block;
    }

    .posts {
        padding: 20px;
        background-color: #FFF;
        max-width: 100%;
        overflow-x: auto;
        table {
            width: 100%;
            text-align: left;
            border-collapse: collapse;
            min-width: 600px;
            th {
                background: #fafafa;
                font-weight: 600;
                border-bottom: 1px solid $primary-border-color;
                padding: 16px;
                &.large {
                    width: 40%;
                }
            }

            tbody {
                td {
                    border-bottom: 1px solid $primary-border-color;
                    padding: 16px;
                }
            }

        }
    }

    .tools {
        margin-bottom: 20px;
        text-align: right;
    }
</style>
