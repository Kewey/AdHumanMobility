import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { uploadMedia } from '../../pages/api/media'

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  register?: UseFormRegister<any>
}

const UploadPhotos = ({
  label,
  name = '',
  register,
  required,
  ...props
}: InputComponentProps) => {
  async function uploadSelectedFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedImg = event?.target?.files?.[0]
    if (!selectedImg) return
    await uploadMedia(selectedImg)
  }

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-gray-400 font-semibold block w-full"
        >
          {label}
        </label>
      )}
      <label
        htmlFor={name}
        className="h-44 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold w-full flex items-center justify-center"
      >
        <div className="flex items-center text-gray-600">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <p>Ajouter une photo</p>
        </div>
      </label>
      <input
        {...(register && register(name, { required }))}
        id={name}
        name={name}
        className="hidden"
        // onChange={uploadSelectedFile}
        accept='accept="image/png, image/jpeg"'
        {...props}
        type={'file'}
      />
    </div>
  )
}

export default UploadPhotos
