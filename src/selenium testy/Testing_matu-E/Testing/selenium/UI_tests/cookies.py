from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

from Testing import ConfigSelenium
from Testing.xpath import *
from Testing.ConfigSelenium import *


def cookies_accept():
    accept_cookies = WebDriverWait(driver, 2).until(
        EC.presence_of_element_located((By.XPATH, cookies.COOKIES_BUTTON)))
    time.sleep(1)
    accept_cookies.click()

