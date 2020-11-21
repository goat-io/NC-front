import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

export const useNameValidation = (name: string | undefined) => {
  const [error, setError] = useState<string | undefined>()
  const { t } = useTranslation()

  useEffect(() => {
    if (!name || name === '') {
      setError(t('Name is required'))
      return
    }
    setError(undefined)
  }, [name, t])

  return { error }
}
