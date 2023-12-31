import React from 'react';


const ProblemPage = (props: any) => {
    const { data } = props;
    console.log(data);
    return (
        <div className='problem-page-component'>
            <div className='problem-page-left-section'>
                <h3>{data?.title}</h3>
                <label className='problem-description'>Description</label>
                <p>
                    {data?.description}
                </p>
                <label>Input : <span>{data?.exampleIn}</span></label>
                <label>Output : <span>{data?.exampleOut}</span></label>
            </div>   
            <div className='problem-page-right-section'>
                <h3>Code Here</h3>
                <textarea id="myTextarea" name="myTextarea">

                </textarea>
                <div className='btns-section'>
                    <button>TestCode</button>
                    <button>SubmitCode</button>
                </div>
            </div> 
        </div>
    )
}


export const getServerSideProps = async(ctx:any) => {
    const problemId = ctx.params.id;
    const response = await fetch(`https://meetcode-y2yz.onrender.com/problems/${problemId}`);
    const result = await response.json();

    return {
        props: {
            data: result.data
        }
    }

}


export default ProblemPage;