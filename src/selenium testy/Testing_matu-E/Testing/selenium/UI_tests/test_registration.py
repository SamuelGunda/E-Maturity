from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

from Testing import ConfigSelenium
from Testing.xpath import *
from Testing.ConfigSelenium import *


def test_registration_happypath():
    driver.get(URL)

    ucet_button = WebDriverWait(driver,2).until(
        EC.presence_of_all_elements_located(By.XPATH, HomePagePaths.UCET_BUTTON)
    )
    ucet_button.click()


