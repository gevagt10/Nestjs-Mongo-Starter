REM This script copies required essential files before running

echo "Copying configuration files..."
xcopy /E /I /Y "../src/config" "../dist/src/config"

