pm2 -PORT=80  ./src/adminConsoleLauncher.js | &
pm2 -PORT=8081 ./src/redirectLauncher.js | &


DNS go.com/{.*} -> 8081 /
    go.com/admin -> 80 /
    admin.go.com -> 8081


1) один функціонал працюючий
2) мок юніт
3) ІТ тести
