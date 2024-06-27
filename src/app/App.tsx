import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../RTCompressor/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../RTCompressor/layout/core'
import {MasterInit} from '../RTCompressor/layout/MasterInit'
import {AuthInit} from './modules/auth'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
