@echo off
IF NOT EXIST %APPDATA%\npm\tsc.cmd (
	ECHO You must have the TypeScript compiler installed. If npm is installed, run
	ECHO npm install -g typescript
	GOTO end
)
CALL %APPDATA%\npm\tsc -m amd --outDir scripts scripts\main.ts
ECHO.
:end