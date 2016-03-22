# This script analyzes classified.csv to find the gender
# distribution of the presidents/chancellors of top US 
# universities. This data is used to build our vis

import csv
from os.path import join

folder = 'data'
thefile = join(folder, 'classified.csv')

presidents = {}

#Open classified csv
with open(thefile, 'r') as classified:
	reader = csv.reader(classified)
	next(reader)

	for row in reader:
		name,term,univ,gender = row
		
		if not presidents.get(univ):
			presidents[univ] = {'M':[], 'F': []}

		presidents[univ][gender].append({'name': name, 'term': term})

f_schools = set()
m_schools = set()

# for s in f_schools:
# 	print(s, presidents[s]['F'])
# 	print('\n')

#Make separate lists for male and female
for school in presidents:
	if len(presidents[school]['F']) > 0:
		f_schools.add(school)
	else:
		m_schools.add(school)

#Write a csv with the gender/count data
with open('data/univ.csv', 'w') as univ:
	writer = csv.writer(univ)
	writer.writerow(['university','female_pres', 'count'])
	
	for s in f_schools:
		temp = set()		#to ensure one person's name doesn't get repeated and add to count

		for k in range(len(presidents[s]['F'])):
			temp.add(presidents[s]['F'][k]['name'])
		writer.writerow([s, 'y',len(temp)])
	
	for p in m_schools:
		writer.writerow([p, 'n', 0])