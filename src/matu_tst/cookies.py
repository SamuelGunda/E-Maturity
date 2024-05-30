from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

from xpath import *
from ConfigSelenium import *
def cookies_accept():
    # accept_cookies = WebDriverWait(driver, 2).until(
    #     EC.presence_of_element_located((By.XPATH, cookies.COOKIES_BUTTON)))
    # time.sleep(1)
    # if accept_cookies.is_displayed():
    #     accept_cookies.click()

    if len(driver.find_elements(By.XPATH, cookies.COOKIES_BUTTON)) > 0:
        accept_cookies = WebDriverWait(driver, 2).until(
            EC.presence_of_element_located((By.XPATH, cookies.COOKIES_BUTTON)))
        accept_cookies.click()
