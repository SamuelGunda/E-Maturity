from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

from xpath import *
from ConfigSelenium import *
from cookies import cookies_accept


def login():
    driver.get(URL)
    cookies_accept()
    ucet_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON)))

    ucet_inputelement.click()
    WebDriverWait(driver, 10).until(EC.url_changes(URL))
    assert "https://maturity-project.web.app/login" == driver.current_url

    email_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.EMAIL_INPUT)))
    password_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.PASSWORD_INPUT)))
    time.sleep(2)
    button_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.LOGIN_BUTTON)))

    email_inputelement.send_keys(Login_Information.username)
    time.sleep(1)
    password_inputelement.send_keys(Login_Information.password)
    time.sleep(1)
    button_inputelement.click()
    time.sleep(1)

def test_login_happypath():
    login()
    time.sleep(1)
    profile_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HeaderPaths.PROFILE_BUTTON))
    )
    assert profile_button.is_displayed()

def test_invalid_credencials():
    driver.get(URL)
    cookies_accept()
    ucet_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON)))
    ucet_inputelement.click()
    WebDriverWait(driver, 10).until(EC.url_changes(URL))
    assert "https://maturity-project.web.app/login" == driver.current_url
    button_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.LOGIN_BUTTON)))
    error_message = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.ERROR_MESSAGE_LOGIN))
    )
    button_inputelement.click()
    time.sleep(2)
    assert error_message.is_displayed()
    driver.refresh()
    email_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.EMAIL_INPUT)))
    button_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.LOGIN_BUTTON)))
    error_message = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.ERROR_MESSAGE_LOGIN)))
    assert not error_message.is_displayed()
    email_inputelement.send_keys("som super")
    button_inputelement.click()
    time.sleep(2)
    assert error_message.is_displayed()
    driver.refresh()
    password_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.PASSWORD_INPUT)))
    button_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.LOGIN_BUTTON)))
    error_message = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.ERROR_MESSAGE_LOGIN)))
    assert not error_message.is_displayed()
    password_inputelement.send_keys("tester")
    button_inputelement.click()
    time.sleep(2)
    assert error_message.is_displayed()
    driver.refresh()
    error_message = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.ERROR_MESSAGE_LOGIN)))
    assert not error_message.is_displayed()
    driver.refresh()
    email_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.EMAIL_INPUT)))
    password_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.PASSWORD_INPUT)))
    button_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.LOGIN_BUTTON)))
    error_message = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.ERROR_MESSAGE_LOGIN)))
    assert not error_message.is_displayed()
    email_inputelement.send_keys("som super")
    password_inputelement.send_keys("tester")
    button_inputelement.click()
    time.sleep(2)
    assert error_message.is_displayed()

def test_rememberme():
    driver.get(URL)
    cookies_accept()
    ucet_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON)))

    ucet_inputelement.click()
    WebDriverWait(driver, 10).until(EC.url_changes(URL))
    assert "https://maturity-project.web.app/login" == driver.current_url

    email_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.EMAIL_INPUT)))
    password_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.PASSWORD_INPUT)))
    button_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.LOGIN_BUTTON)))
    rememberme_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.REMEMBER_ME_BUTTON))
    )

    email_inputelement.send_keys(Login_Information.username)
    password_inputelement.send_keys(Login_Information.password)
    rememberme_inputelement.click()
    time.sleep(1)
    button_inputelement.click()
    time.sleep(1)

    driver.get(URL)
    ucet_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON)))

    ucet_inputelement.click()
    WebDriverWait(driver, 10).until(EC.url_changes(URL))
    button_inputelement = WebDriverWait(driver, 2).until(
    EC.presence_of_element_located((By.XPATH, LoginPagePaths.LOGIN_BUTTON)))
    time.sleep(2)
    button_inputelement.click()
    profile_button = WebDriverWait(driver, 2).until(
    EC.presence_of_element_located((By.XPATH, HeaderPaths.PROFILE_BUTTON)))
    assert profile_button.is_displayed()

def test_forgot_password():
    driver.get(URL)
    cookies_accept()
    ucet_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON)))

    ucet_inputelement.click()
    WebDriverWait(driver, 10).until(EC.url_changes(URL))
    assert "https://maturity-project.web.app/login" == driver.current_url

    forgot_password_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.FORGOT_PASSWORD_BUTTON))
    )
    forgot_password_button.click()
    time.sleep(1)
    assert "https://maturity-project.web.app/forgot-password" == driver.current_url
