import Accordion from "@/modules/shared/components/ui/Accordion";
import { NextPage } from "next";

const DetailBlogAcordion: NextPage<any> = ({ blog }) => {

    return (
        <div className="space-y-5 mt-20">
            {
                blog && blog.acf?.pp_faq?.pp_subject_q1  && <h2 className="text-3xl mb-10">سوالات متداول</h2>
            }
            {
                blog && blog.acf.pp_faq?.pp_subject_q1 && blog.acf.pp_faq?.pp_answer_q1 &&                
                <Accordion title={blog.acf.pp_faq.pp_subject_q1} content={blog.acf.pp_faq.pp_answer_q1} />
            }
            {
                blog && blog.acf.pp_faq?.pp_subject_q2 && blog.acf.pp_faq?.pp_answer_q2 &&                
                <Accordion title={blog.acf.pp_faq.pp_subject_q2} content={blog.acf.pp_faq.pp_answer_q2} />
            }
            {
                blog && blog.acf.pp_faq?.pp_subject_q3 && blog.acf.pp_faq?.pp_answer_q3 &&                
                <Accordion title={blog.acf.pp_faq.pp_subject_q3} content={blog.acf.pp_faq.pp_answer_q3} />
            }
            {
                blog && blog.acf.pp_faq?.pp_subject_q4 && blog.acf.pp_faq?.pp_answer_q4 &&                
                <Accordion title={blog.acf.pp_faq.pp_subject_q4} content={blog.acf.pp_faq.pp_answer_q4} />
            }
            {
                blog && blog.acf.pp_faq?.pp_subject_q5 && blog.acf.pp_faq?.pp_answer_q5 &&                
                <Accordion title={blog.acf.pp_faq.pp_subject_q5} content={blog.acf.pp_faq.pp_answer_q5} />
            }
        </div>
    )
}

export default DetailBlogAcordion;