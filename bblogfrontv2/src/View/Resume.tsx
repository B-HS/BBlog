import { Box } from "@chakra-ui/react";

import dompurify from "dompurify";

const Resume = () => {
    const tmpContext = "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ipsa error accusantium eaque amet non deserunt, harum quaerat sed architecto. Exercitationem, est suscipit! Id eveniet possimus in modi est quas.<br><br><br>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat eveniet nam repellat vitae esse aliquam expedita dignissimos fugiat ipsam? Quas distinctio magnam id similique nihil officia minima iste nobis voluptate!<br><b>TESTESTESTEST</b></p>";
    const sanitizer = dompurify.sanitize;
    return (
        <>
            <Box borderWidth="1px" p={5} mt={5}>
                <div dangerouslySetInnerHTML={{ __html: sanitizer(tmpContext) }}></div>
            </Box>
        </>
    );
};
export default Resume;
