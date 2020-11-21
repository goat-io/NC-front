import React, { Fragment } from 'react'

import { Form } from 'reactstrap'
import { PhoneSignIn } from './PhoneSignIn'
import { useTranslation } from 'react-i18next'

export const LoginForm = () => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <div className="modal-dialog w-100 mx-auto">
        <div className="modal-content">
          <div className="modal-body">
            <div className="h5 modal-title text-center">
              <h4 className="mt-2">
                <div>{t('Welcome back')}</div>
              </h4>
            </div>
            <div className="divider" />
            <Form>
              <PhoneSignIn />
            </Form>
          </div>
          <div className="modal-footer clearfix">
            <div className="float-right"></div>
          </div>
        </div>
      </div>
      <div className="text-center text-white opacity-8 mt-3">
        Copyright &copy; NC-challenge 2020
      </div>
    </Fragment>
  )
}
