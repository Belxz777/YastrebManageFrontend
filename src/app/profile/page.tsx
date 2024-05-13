'use client'
import authUser from '@/components/server/Auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React, { Suspense, use, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { checkCookie } from '@/components/server/CheckCookie';
import { getUserName, getUserProjects, getUserTask } from '@/components/server/getUserProjects';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { beautifyArray, toNames } from '@/components/server/other/fromIdsToNames';
import { fetchTitle } from '@/components/server/FetchJobTitle';
import { deleteProject, deleteUser } from '@/components/server/deleteObj';
import Loading from '@/components/assembled/Loading';
import { allDepMembers } from '@/components/server/getAllDepartment';
import Error from '@/components/buildIn/Error';
import Navigation from '@/components/buildIn/Navigation';
import UserProfile from '@/components/buildIn/UserProfile';
import DpMembers from '@/components/buildIn/DpMembers';
import ProjectsCard from '@/components/buildIn/ProjectsCard';
//TODO РАЗБИТЬ ВСЕ НА КОМПОНЕНТЫ , А ТАКЖЕ ДОБАВИТЬ ЗАГРУЗКУ И ОБРАБОТКУ ОШИБОК
//& ДОБАВИТЬ ISSUES КАК ПРИЯТНОЕ ДОПОЛНЕНИЕ ОТВЕРСТАТЬ ГЛАВНУЮ СТРАНИЦУ
//? ИСПРАВИТЬ ВСЕ НЕДОЧЕТЫ ГОТОВИТЬСЯ ДЕЛАТЬ СТРАНИЦУ ОТЧЕТА
const Profile = () => {
    const [userData, setUserData] = useState<userData | null>(null);
    const [status,setStatus] = useState({
      isBoss:false,
deparmentId:0
    })
    const [error,setError] = useState({
      status:false,
      text:"",
    })
    const isServer = typeof window !== 'undefined'
    const [projects,setProjects] = useState<project | Array<project> | null>(null)
    const [title, setTitle] = useState("")
    const [departmentMembers,setDepartmentMembers]  = useState<userData[]| null>(null);
const router  = useRouter()
const userId: userData =  isServer && JSON.parse(localStorage?.getItem('userData') || '{}');
    useEffect(() => {

      const fetchData = async () => {
        const isToken =  await checkCookie()
        if(!isToken){
  router.push('/login')
  return
        }
        try {
          const response = await authUser();
          console.log(response.userData)
          setUserData(response.userData);

          setJobTitle(response.userData.job_title_id)
      if (response.userData.position =='B'){
        const departmentMembers = await allDepMembers(response.userData?.department_id)
        setDepartmentMembers(departmentMembers)
        setStatus({
          isBoss:true,
          deparmentId:response.userData?.department_id
        })
        console.log('departmentMembers', departmentMembers)
        getUserProjectsClient()
      }
      getUserProjectsClient()  
        }
         catch (error) {
        setError({status:true, text:"Ошибка аутентификации пользователя"})
      //  throw new Error('error happened while authenticating user')
        }
      };
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if(userData){
      localStorage.setItem('userData', JSON.stringify(userData))
    }
    //TODO оживить поиск по юзерам и проектам , достилизовать 
    //! ОТЧЕТЫ СКАЧИВАНИЕ СДЕЛАТЬ ДЛЯ БОСА
    //? БУДУЩЕЕ : ДОБАВИТЬ РАЗДЕЛ ISSUES
    //*ДОСТИЛИЗОВАТЬ ВСЕ ДОБАВИТЬ ЕЩЕ CSS ПЕРЕМЕННЫХ И ДОБИТЬ РЕСПОНСИВ V0 В ПОМОЩЬ
  async function getUserProjectsClient() {
    try {
      const response =  await getUserProjects(userId.id);
      if(!response){
        return
      }
      setProjects(response)
    } catch (error) {
      alert(`${error} on project`,);
    }
  }
  async function setJobTitle(id: number) {
    try {
    
      const title = await  fetchTitle(id);
      localStorage.setItem('jobTitle', title);
setTitle(title)
      } 
    catch (error) {
      alert(error);
    }
  }
async function ifIsBoss(){
  const allDepartment =  await allDepMembers(userId.department_id)
  setDepartmentMembers(allDepartment)
}
  return (          
  <Suspense fallback={<Loading color='#FA8072'/>} >
  <Navigation isBoss={false}  idOfDep={status.deparmentId} isImage={false} />
  <main className="bg-[#0D1117] min-h-screen text-white">
<div className="flex">
              {
                  userData ?  
                  <>
                
     <UserProfile
      userData={userData} title ={title}/>
       <section className="flex flex-col flex-grow  p-8 space-y-6">
      {
        departmentMembers && <DpMembers departmentMembers={departmentMembers}/>
      }
         {
      projects ?
    <ProjectsCard projects={projects}/>
      :
      <>
   <p> У тебя нет проектов</p>
   <Button onClick={getUserProjectsClient } className='flex justify-center'>Обновить</Button>
  
   </>
}
</section>
      </>
      :
      null
}
</div>
    </main>
    </Suspense>
  )
}

export default Profile