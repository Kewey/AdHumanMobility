import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent } from 'react'

interface UploadFilesComponentProps {
  handleSelectedFiles: (event: ChangeEvent<HTMLInputElement>) => void
}

const UploadFiles = ({ handleSelectedFiles }: UploadFilesComponentProps) => {
  return (
    <div>
      <label
        htmlFor="filesUploader"
        className="h-44 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer font-semibold w-full flex items-center justify-center"
      >
        <div className="flex items-center text-gray-600">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <p>Ajouter une photo</p>
        </div>
      </label>
      <input
        onChange={handleSelectedFiles}
        id="filesUploader"
        hidden={true}
        multiple={true}
        accept="image/*, video/*"
        type={'file'}
      />
    </div>
  )
}

export default UploadFiles
