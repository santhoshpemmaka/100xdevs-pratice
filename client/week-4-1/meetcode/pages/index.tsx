import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [problemList, setproblemList] = useState([]);
    useEffect(() => {
        const fetchProblems = async () => {
            const response = await fetch('https://meetcode-y2yz.onrender.com/problems');
            const result = await response.json();
            if (response.status == 200) {
                setproblemList(result.problems)
            }
        }
        fetchProblems();

    }, []);
    return (
    <>
      <Head>
        <title>Meet Code</title>
        <meta name="description" content="MeetCode coding platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
            <div className='table-component'>
                  <table>
                      <thead>
                          <tr>
                              <th>
                                  Problem ID
                              </th>
                              <th>
                                  Title
                              </th>
                              <th>
                                  Description
                              </th>
                              <th>
                                  Difficulty
                              </th>
                          </tr>
                        </thead>
                        {problemList && problemList?.length && problemList.map((problem:any) => (
                            <tbody key={problem.problemId}>
                                <tr>
                                    <td>
                                        {problem.problemId}
                                    </td>
                                    <td>
                                        <Link href={`/problems/${problem.problemId}`} className='link-tag-problem'>  
                                            {problem.title}
                                        </Link>
                                    </td>
                                    <td>
                                        {problem.title}
                                    </td>
                                    <td>
                                        {problem.difficulty}
                                    </td>
                                </tr>
                            </tbody>
                        )) }
                      
                  </table>
            </div>
      </main>
    </>
  )
}
