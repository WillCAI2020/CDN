@echo off
echo "Introduction: Update the remote repository, written by ruchan"
echo "Steps:"

::ע���޸�Ϊ���Լ��Ĳֿ��ַ
echo "1. Move to working directory" 
cd D:\Github\WillCAI2020\CDN

echo "2. Display the status of the working directory and staging area" 
git status

echo "3. Start submitting code to the local repository"
git add .
 
echo "4. Commit the changes to the local repository"
set /p message=�������ύ��Ϣ��
echo %message%
git commit -m "%message%"
 
echo "5. Push the changes to the remote git server"
git push origin master
 
echo "You have successfully submitted!"
pause