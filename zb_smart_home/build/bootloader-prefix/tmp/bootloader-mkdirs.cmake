# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "D:/esp/esp-idf/components/bootloader/subproject"
  "D:/LuanVan/Smarthome_Zigbee/source/esp32/zb_smart_home/build/bootloader"
  "D:/LuanVan/Smarthome_Zigbee/source/esp32/zb_smart_home/build/bootloader-prefix"
  "D:/LuanVan/Smarthome_Zigbee/source/esp32/zb_smart_home/build/bootloader-prefix/tmp"
  "D:/LuanVan/Smarthome_Zigbee/source/esp32/zb_smart_home/build/bootloader-prefix/src/bootloader-stamp"
  "D:/LuanVan/Smarthome_Zigbee/source/esp32/zb_smart_home/build/bootloader-prefix/src"
  "D:/LuanVan/Smarthome_Zigbee/source/esp32/zb_smart_home/build/bootloader-prefix/src/bootloader-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "D:/LuanVan/Smarthome_Zigbee/source/esp32/zb_smart_home/build/bootloader-prefix/src/bootloader-stamp/${subDir}")
endforeach()
