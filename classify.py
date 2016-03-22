# # This script reads in a file with the list of presidents and 
# converts it to a dictionary with university names as keys.
# Each univ key points to a list of president objects. Each of
# this object has a 'name' and a 'term' value.

# It then analyzes the dictionary to see which schools have had
# female presidents/chancellors, classifies universities into
# two categories: yes or no, and writes a new CSV file with
# this classification so that we can use it in a visualization

from os.path import join
from gender import detect_gender
import csv

folder = 'data'
thefile = join(folder, 'presidents.txt')

with open(thefile, 'r') as infile:
	pres_dict = {}

	with open('data/classified.csv', 'w') as outfile:
		writer = csv.writer(outfile)
		writer.writerow(['name','term', 'university', 'gender'])
	
	#read through each line
		for line in infile:
			temp = line.strip().split(',')
			pres, term, univ = line.strip().split(',')
			univ = univ.strip()
			
			first_name = pres.split(' ')[0]
			res = detect_gender(first_name)
			temp.extend([res['gender']])
			writer.writerow(temp)

# # This part is just to check if we have got all the names 
# # in the file.

# # count = 0
# # for school in pres_dict:
# # 	print(school, 'has had', len(pres_dict[school]), 'presidents')
# # 	print('\n')
# # 	count += 1
# # print('Looked at', count, 'schools')

# schools_analyzed = {}