class HomePagePaths:
    UCET_BUTTON = '//*[@id="header_reg_button"]/p'
class LoginPagePaths:
    EMAIL_INPUT = '//*[@id="meno"]'
    PASSWORD_INPUT = '//*[@id="heslo"]'
    LOGIN_BUTTON = '//*[@id="loginButton"]'
    ERROR_MESSAGE_LOGIN = '//*[@id="errorMessage"]'
    REMEMBER_ME_BUTTON = '//*[@id="rememberMe"]'
    REGISTRACIA_BUTTON = '//*[@id="registerButton"]'
    FORGOT_PASSWORD_BUTTON = '//*[@id="forgotButton"]'

class RegistrationPagePaths:
    NAME_INPUT = '//*[@id="krstne"]'
    LAST_NAME_INPUT = '//*[@id="priezv"]'
    EMAIL_INPUT = '//*[@id="email"]'
    PASSWORD_INPUT = '//*[@id="heslo"]'
    PASSWORD_CHECK_INPUT = '//*[@id="hesloKontrola"]'
    BACK_TO_REGISTRATION_BUTTON = '//*[@id="register_log_button"]'
    ZALOZ_UCET = '//*[@id="createButton"]'


class HeaderPaths:
    PROFILE_BUTTON = '//*[@id="userAccButton"]'
    LOG_OUT_BUTTON = '//*[@id="logOutButton"]'

class cookies:
    COOKIES_BUTTON = '//*[@id="acceptCookiesButton"]'
    COOKIES_TEXT = '/html/body/app-root/div/div/app-tos-page/div/div'

class hamburgermenu_items:
    DOMOV_BUTTON='//*[@id="nav_menu_home"]'

