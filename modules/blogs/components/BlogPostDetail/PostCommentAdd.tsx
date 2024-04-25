import { NextPage } from "next";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

import { ServerAddress   } from "@/enum/url";
import axios from "axios";
import { validateEmailNotReqired, validateRequied } from "@/modules/shared/helpers/validation";

const PostComment: NextPage<any> = ({ postId }) => {
    
    const [newCommentSubmitMessage, setnewCommentSubmitMessage] = useState<string>()

    type FormValues = {
        name: string,
        email: string,
        text: string
    }
    const initialdata: FormValues = {
        name: '',
        email: '',
        text: ''
    }

    const submitHandle = async (values: FormValues, actions: any) => {
        let CommentUser = {
            author_name: values.name,
            author_email: values.email || null,
            content: values.text,
            post: postId
        }
        setnewCommentSubmitMessage('در حال ارسال...')
        const post = await axios.post(`${ServerAddress.Type}${ServerAddress.Blog}/wp-json/wp/v2/comments`, CommentUser)
        if (post.status == 200 || post.status == 201) {
            setnewCommentSubmitMessage('نظر شما با موفقیت ثبت شد')
            actions.resetForm()
            setInterval(() => {
                setnewCommentSubmitMessage('')
            },(5000))
        }
        else {
            setnewCommentSubmitMessage('نظر شما ثبت نشد')
        }
    }
    
    return (
        <div>
            <h2 className="mt-20 text-3xl mb-10">ثبت نظر</h2>

            <div className="w-full border-gray-200 border-1 max-sm:border-0 max-sm:p-2 p-8 rounded">
            <Formik
                    initialValues={initialdata}
                    onSubmit={submitHandle}
                >
                    {({ errors , touched }) => (
                    <Form className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <div>        
                        <label htmlFor="name"><span className="text-red-600">*</span>نام شما</label>
                        <Field name="name" 
                        className={`${errors.name&&touched.name ? 'border-red-600' : 'border-gray-400' } border-1 p-2 w-full rounded outline-none duration-300`}
                        validate={(value: string) => validateRequied(value, 'لطفا نام خود را وارد کنید')}/>
                        {errors.name && touched.name && <small className="text-red-600 duration-200">{errors.name}</small>}
                        <br/>        
                        <label htmlFor="email">ایمیل</label>
                        <Field name="email"
                        className={`${errors.email&&touched.email ? 'border-red-600' : 'border-gray-400' } border-1 p-2 w-full rounded outline-none  duration-300`}
                        validate={(value: string) => validateEmailNotReqired({value,invalidMessage: 'ایمیل معتبر نیست'})}/>
                        {errors.email && <small className="text-red-600">{errors.email}</small>}
                    </div>
                    <div>        
                        <label htmlFor="text"><span className="text-red-600">*</span>متن</label>
                        <Field name="text" as='textarea'
                            className={`${errors.text&&touched.text ? 'border-red-600' : 'border-gray-400' } border-1 p-2 w-full rounded outline-none duration-300`}
                            validate={(value: any) => validateRequied(value, 'متن نظر را وارد کنید')}/>
                        {errors.text && touched.text && <small className="text-red-600">{errors.text}</small>}
                    </div>
                            <button
                                type="submit"
                                className="bg-blue-300 p-2 text-white rounded w-fit"
                            >ارسال نظر</button>
                            <p className="text-xl font-bold">{newCommentSubmitMessage}</p>
                </Form>
                    )}
            </Formik>
            </div>    
        </div>
    )
}

export default PostComment;