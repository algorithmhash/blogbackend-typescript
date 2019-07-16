import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interfaces':
import { CreatePostTDO } from './tdo/create-post.tdo';

@Injectable()
export class BlogService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>){}
        async getPosts(): Promise<Post[]> {
            const posts = await this.postModel.find().exec();
            return posts;
        }

        async getPost(postID): Promise<Post> {
            const post = await this.postModel.findByID(postID).exec();
            return post;
        }
        
        async addPost(createPostTDO: CreatePostTDO): Promise<Post> {
            const newPost = await this.postModel.findByIdAndUpdate(createPostTDO);
            return newPost.save();
        }
        async editPost(postID, createPostTDO: CreatePostTDO): Promise<Post>{
            const editedPost = await this.postModel.findByIdAndUpdate(postID, createPostTDO, { new: true});
            return editedPost;
        }
        async deletePost(postID): Promise<any>{
            const deletedPost = await this.postModel.findByIdAndRemove(postID).exec();
            return deletedPost;
        }
    
}
