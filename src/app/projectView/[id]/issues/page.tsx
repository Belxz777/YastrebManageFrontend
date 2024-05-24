"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import AddProblem from '@/components/buildIn/AddProblem'
import ProjectData from '@/components/buildIn/ProjectData'
import { useIssues } from '@/hooks/useIssues'
import Loading from '@/components/buildIn/Loading'
import { useCheck } from '@/hooks/useCheck'
import Navigation from '@/components/buildIn/Navigation'
import { TrashIcon } from '@/svgs/Svg'
import { deleteIssue } from '@/components/server/deleteObj'
type Props = {
  params:{
    id:number
  }
}

const Issues = (props: Props) => {
  const [selected, setselected] = useState<number>(0)
  const [isOpened, setisOpened] = useState(false)
  const [type, settype] = useState<"delete" | "change" | "patch" | "add" | null>(null)
  const [current, setcurrent] = useState("")
const {isMounted,problems,getAllProblemsClient} = useIssues(props.params.id)
const ableToChange = useCheck(props.params.id)
  //! Добавить доску ошибок 
  return (
    <>
    {
      !isMounted && <Loading/>
    }
      {
        isOpened && <AddProblem reloadPageF={getAllProblemsClient} isOpened={isOpened} project={1} setisOpened={setisOpened} type={type} id={selected} current={current} />
      }
            <ProjectData projectId={1} projectName='' withMenu={true}/>
      <main className="bg-basic-default rounded-lg shadow-md p-6  min-h-screen w-full">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Доска Ошибок</h1>
          {
            ableToChange &&  <Button variant="default" size="sm"
            onClick={() => {
              setisOpened(true);
              settype("add");
              setselected(1); 
              getAllProblemsClient()
            }}>Создать проблему</Button>
          }
    
        </header>
        <div className="">
          {
            problems ?
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Номер</th>
                    <th className="text-left">Заголовок</th>
                    <th className="text-left">Описание</th>
                    <th className="text-left">
                      <div className="flex items-center gap-2">
                        <span>Создано</span>
                      </div>
                    </th>
                    <th className="text-left">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Array.isArray(problems) ?
                    problems.map((problem) =>
                      <tr key={problem.id} className=' border-b-2 border-white md:border-b-2 lg:border-b-2 xl:border-b-0'>
                        <td>#{problem.id}</td>
                        <td className="font-medium border-r-2  border-white md:border-r-2 lg:border-r-2 xl:border-r-0">{problem.name}
                        </td>
<td className=' pl-2'>{problem.description}</td>
                        <td className='border-l-2  border-white md:border-l-2 lg:border-l-2 xl:border-l-0'>{problem.created_at}</td>
                        <td>
                          {
                            problem.status === 'Открыто' ?
                            <Badge
                            className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 select-none cursor-pointer"
                            variant="outline"
                            onDoubleClick={() => {
                              if(!ableToChange){
                                alert("")
                                return
                              }
                              setisOpened(true);
                              settype("change");
                              setselected(problem.id);
                             setcurrent( "Закрыто" )
                            }}
                          >
                            {problem.status}
                          </Badge>
                          :
                          <Badge
                          className="bg-red-400 text-white select-none cursor-pointer"
                          variant="outline"
                          onDoubleClick={() => {
                            if(!ableToChange){
                              return
                            }
                            setisOpened(true);
                            settype("change");
                            setselected(problem.id);
                           setcurrent( "Открыто" )
                          }}
                        >
                          {problem.status}
                        </Badge>
                          }
                
                        </td>
                      </tr>
                    )
                    :
                    <tr key={problems.id}>
                    <td>{problems.id}</td>
                    <td className="font-medium">{problems.name}
                    <Button
                                  className=" bg-orange-600"
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => {
                                  const sure  = confirm("Вы уверены?");
                                  if(sure) {
                                  deleteIssue(problems.id)
                                  }
                                  return
                                   
                                  }}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button></td>
                    <td>{problems.description}</td>
                        <td>{new Date(problems.created_at).toLocaleDateString()}</td>

                    <td>
                      <Badge
                        className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 select-none"
                        variant="outline"
                        onDoubleClick={() => {
                          setisOpened(true);
                          settype("change");
                          setselected(problems.id);
                          setcurrent(problems.status == "Открыто" ? "Закрыта" :"Открыта")
                        }}
                      >
                        {problems.status}
                      </Badge>
                
                    </td>
<td>
</td>
      
                  </tr>
              
                  }
                </tbody>
              </table>
              :
              null
          }
        </div>
      </main>
    </>
  )
}
export default Issues