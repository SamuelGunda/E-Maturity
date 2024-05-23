class HomePagePaths:
    UCET_BUTTON = '//*[@id="header_reg_button"]/p'
class LoginPagePaths:
    EMAIL_INPUT = '//*[@id="meno"]'
    PASSWORD_INPUT = '//*[@id="heslo"]'
    LOGIN_BUTTON = '/html/body/app-root/div/div/app-login-page/div/div/div/div[5]/button[1]'
    ERROR_MESSAGE_LOGIN = '/html/body/app-root/div/div/app-login-page/div/div/div/div[3]/p'
    REMEMBER_ME_BUTTON = '//*[@id="rememberMe"]'
    REGISTRACIA_BUTTON = '/html/body/app-root/div/div/app-login-page/div/div/div/div[5]/button[2]'
    FORGOT_PASSWORD_BUTTON = '/html/body/app-root/div/div/app-login-page/div/div/div/div[2]/button'

class RegistrationPagePaths:
    NAME_INPUT = '//*[@id="krstne"]'
    LAST_NAME_INPUT = '//*[@id="priezv"]'
    EMAIL_INPUT = '//*[@id="email"]'
    PASSWORD_INPUT = '//*[@id="heslo"]'
    PASSWORD_CHECK_INPUT = '//*[@id="hesloKontrola"]'
    BACK_TO_REGISTRATION_BUTTON = '//*[@id="register_log_button"]/p'
    ZALOZ_UCET = '/html/body/app-root/div/div/app-register-page/div/div/div/div[6]/button[2]/p'


class HeaderPaths:
    PROFILE_BUTTON = '//*[@id="main_header"]/div[3]/p[1]/img'
    LOG_OUT_BUTTON = '//*[@id="main_header"]/div[3]/p[2]/img'

class cookies:
    COOKIES_BUTTON = '/html/body/app-root/div/div/app-tos-page/div/div/div/button'
