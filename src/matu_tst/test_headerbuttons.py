from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

import test_login
from xpath import *
from ConfigSelenium import *
from cookies import cookies_accept
def test_ucet_button():
    driver.get(URL)
    cookies_accept()
    ucet_inputelement = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON)))
    ucet_inputelement.click()
    WebDriverWait(driver, 10).until(EC.url_changes(URL))
    assert "https://maturity-project.web.app/login" == driver.current_url

def test_logout_button():
    test_login.login()
    time.sleep(1)
    log_out_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HeaderPaths.LOG_OUT_BUTTON))
    )
    log_out_button.click()
    time.sleep(1)
    ucet_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HomePagePaths.UCET_BUTTON))
    )
    assert ucet_button.is_displayed()
def test_profile_button():
    test_login.login()
    time.sleep(1)
    profile_button = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, HeaderPaths.PROFILE_BUTTON))
    )
    profile_button.click()
    time.sleep(1)
    assert "https://maturity-project.web.app/user-account" == driver.current_url


