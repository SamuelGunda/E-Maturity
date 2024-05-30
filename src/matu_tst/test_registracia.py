from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

from ConfigSelenium import *
from cookies import cookies_accept
from xpath import *



def test_happypath():
    name = ""
    last_name = ""
    email = ""
    password = ""

    driver.get(URL)
    cookies_accept()
    ucet_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON)))
    ucet_inputelement.click()
    register_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.REGISTRACIA_BUTTON)))
    register_button.click()
    time.sleep(1)
    name_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.NAME_INPUT)))
    last_name_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.LAST_NAME_INPUT)))
    email_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.EMAIL_INPUT)))
    password_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.PASSWORD_INPUT)))
    password_check_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.PASSWORD_CHECK_INPUT)))
    zaloz_ucet_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.ZALOZ_UCET)))

    name_inputelement.send_keys(name)
    last_name_inputelement.send_keys(last_name)
    email_inputelement.send_keys(email)
    password_inputelement.send_keys(password)
    password_check_inputelement.send_keys(password)
    zaloz_ucet_button.click()
    time.sleep(1)

    logout_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HeaderPaths.LOG_OUT_BUTTON))
    )
    logout_button.click()
    time.sleep(1)

    ucet_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON))
    )
    ucet_button.click()
    time.sleep(1)

    email_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.EMAIL_INPUT)))
    password_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.PASSWORD_INPUT)))
    time.sleep(2)
    button_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, LoginPagePaths.LOGIN_BUTTON)))
    time.sleep(2)

    email_inputelement.send_keys(email)
    password_inputelement.send_keys(password)
    button_inputelement.click()

    profile_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HeaderPaths.PROFILE_BUTTON)))
    assert profile_button.is_displayed()

# def test_invalid_inputs_registration():
#     name = "Thor"
#     last_name = "Odinson"
#     email = "thor.odinson@gmail.com"
#     password = "password"
#
#     driver.get(URL)
#     cookies_accept()
#     ucet_inputelement = WebDriverWait(driver, 2).until(
#         EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON)))
#     ucet_inputelement.click()
#
#     register_button = WebDriverWait(driver, 2).until(
#         EC.presence_of_element_located((By.XPATH, LoginPagePaths.REGISTRACIA_BUTTON)))
#     register_button.click()
#     time.sleep(1)
#     name_inputelement = WebDriverWait(driver, 2).until(
#         EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.NAME_INPUT)))
#     last_name_inputelement = WebDriverWait(driver, 2).until(
#         EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.LAST_NAME_INPUT)))
#     email_inputelement = WebDriverWait(driver, 2).until(
#         EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.EMAIL_INPUT)))
#     password_inputelement = WebDriverWait(driver, 2).until(
#         EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.PASSWORD_INPUT)))
#     password_check_inputelement = WebDriverWait(driver, 2).until(
#         EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.PASSWORD_CHECK_INPUT)))
#     zaloz_ucet_button = WebDriverWait(driver, 2).until(
#         EC.presence_of_element_located((By.XPATH, RegistrationPagePaths.ZALOZ_UCET)))
#
#     wrong_email = "thor.odinsongmail.com"
#     wrong_password = "pass"
#     name_inputelement.send_keys(name)
#     last_name_inputelement.send_keys(last_name)
#     email_inputelement.send_keys(email)
#     password_inputelement.send_keys(password)
#     zaloz_ucet_button.click()
#     time.sleep(1)
#     asse
