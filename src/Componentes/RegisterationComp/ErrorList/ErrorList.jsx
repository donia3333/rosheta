import React from 'react'

export default function ErrorList({Formik,type}) {
      
  return (
    <>    
               {Formik.errors[type] && Formik.touched[type] ? 
                    <div className='alert alert-danger text-danger'>
                      {Formik.errors[type]}
                      </div>
                  :('')
               } 
    </>
  )
}
