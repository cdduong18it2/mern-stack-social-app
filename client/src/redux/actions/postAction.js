import { GLOBALTYPES } from "./globalTypes"
import { imageUpload } from '../../untils/imageUpload';
import { postDataAPI, getDataAPI, patchDataAPI } from "../../untils/fetchData";

export const POST_TYPES = {
    CREATE_POST: "CREATE_POST",
    LOADING_POST: "LOADING_POST",
    GET_POST: "GET_POST",
    UPDATE_POST: "UPDATE_POST"
}


export const createPost = ({ content, images, auth }) => async (dispatch) => {
   let media = [];
   
   try {
       dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
       if(images.length > 0)    media = await imageUpload(images)
       
       const res = await postDataAPI('posts', {content, images: media}, auth.token)
      
       dispatch({
            type: POST_TYPES.CREATE_POST, 
            payload: {...res.data.newPost, user: auth.user} 
        })
       
       dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })
   } catch (err) {
       dispatch({
           type: GLOBALTYPES.ALERT,
           payload: {error : err.response.data.msg}
       })
   }
}
export const getPosts = (token) => async (dispatch) =>  {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
        
        const res = await getDataAPI('posts', token);
        console.log(res);
        dispatch({ type: POST_TYPES.GET_POST, payload: res.data })
        
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error : err.response.data.msg}
        })
    }
}
export const updatePost = ({content, images, auth, status}) => async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    //console.log({imgNewUrl, imgOldUrl})
    if(status.content === content
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(imgNewUrl.length > 0)    media = await imageUpload(imgNewUrl)
        const res = await patchDataAPI(`post/${status._id}`, {
            content, images: [...imgOldUrl, ...media]
        }, auth.token);
        console.log(res);

        dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error : err.response.data.msg}
        })
    }
}
export const likePost = ({post, auth}) => async (dispatch) => {
    console.log(post)
    const newPost = {...post, likes: [...post.likes, auth.user]}
    console.log(newPost)
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}