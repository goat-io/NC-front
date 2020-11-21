import React, { Fragment } from 'react'
import { observer, useObserver } from 'mobx-react'

import cx from 'classnames'
import { useAuthStore } from '../../Auth/store/AuthenticationStore'
import { useTranslation } from 'react-i18next'

const useStoreData = () => {
  const { AuthStore } = useAuthStore()
  return useObserver(() => ({
    userProfile: AuthStore.user?.profile,
  }))
}

export const ProfileTitle = observer(() => {
  const { userProfile } = useStoreData()
  const { t } = useTranslation()
  const displayName = userProfile?.name || userProfile?.id

  return (
    <Fragment>
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div
              className={cx('page-title-icon', {
                'd-none': false,
              })}
            >
              <i className="lnr-users" />
            </div>
            <div>{t('PROFILE_WITH_NAME', { name: displayName })}</div>
          </div>
        </div>
      </div>
    </Fragment>
  )
})
