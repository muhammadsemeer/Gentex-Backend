#! /bin/bash

echo "Running pre-commit hook"

# $? stores exit value of the last command
npm run lint
LINT=$?

if [[ $LINT -ne 0 ]]; then
    echo -e "\e[1;30m"
    echo -e "\e[1;41m FAIL \e[0m\e[31m  All Test Should Pass Before commit \e[0m"
    exit 1
else
    echo -e "\e[1;30m"
    echo -e "\e[1;42m PASS \e[0m\e[32m All Tests Passed \e[0m"
    exit 0
fi
