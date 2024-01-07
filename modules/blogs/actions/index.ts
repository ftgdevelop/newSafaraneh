import axios from 'axios';

import { ServerAddress, Blog } from "../../../enum/url";

export const getBlogs = async () => {

    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Blog}${Blog.getPosts}?per_page=${1}`,
        )
        return response
    } catch (error) {
        return error
    }

}
