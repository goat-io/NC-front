import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

const isValidEmail = (email: string) => {
  const re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const useEmailValidation = (email: string | undefined) => {
  const [error, setError] = useState<string | undefined>()
  const { t } = useTranslation()

  useEffect(() => {
    if (!email || email === '') {
      setError(t('Email is required'))
      return
    }

    if (!isValidEmail(email)) {
      setError(t('Email is not valid'))
      return
    }
    setError(undefined)
  }, [email, t])

  return { emailError: error }
}
