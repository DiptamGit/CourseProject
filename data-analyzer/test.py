filepath = 'C:/Users/dipta/OneDrive/Documents/MCS/CS 410/CourseProject/file-read-api/search.txt'
f = open(filepath, "r", errors='ignore')
for line in f:
    if "\n" in line:
        print('---------------------------------------------------------------------------------------------------------------------') 
    print(line)
    