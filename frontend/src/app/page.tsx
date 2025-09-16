'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const specialties = [
  'Bipolar',
  'LGBTQ',
  'Medication/Prescribing',
  'Suicide History/Attempts',
  'General Mental Health (anxiety, depression, stress, grief, life transitions)',
  "Men's issues",
  'Relationship Issues (family, friends, couple, etc)',
  'Trauma & PTSD',
  'Personality disorders',
  'Personal growth',
  'Substance use/abuse',
  'Pediatrics',
  "Women's issues (post-partum, infertility, family planning)",
  'Chronic pain',
  'Weight loss & nutrition',
  'Eating disorders',
  'Diabetic Diet and nutrition',
  'Coaching (leadership, career, academic and wellness)',
  'Life coaching',
  'Obsessive-compulsive disorders',
  'Neuropsychological evaluations & testing (ADHD testing)',
  'Attention and Hyperactivity (ADHD)',
  'Sleep issues',
  'Schizophrenia and psychotic disorders',
  'Learning disorders',
  'Domestic abuse',
]

export default function Home() {
  const [advocates, setAdvocates] = useState([])
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchInput, setSearchInput] = useState('')

  const limit = 5

  const fetchAdvocates = async (q = '', specialty = '', pageNum = 1) => {
    try {
      const query = new URLSearchParams({
        q,
        specialty,
        page: pageNum.toString(),
        limit: limit.toString(),
      })

      const res = await fetch(`http://localhost:8888/advocates?${query}`)
      const data = await res.json()

      setAdvocates(data.items || [])
      setTotalPages(data.total || 1)
    } catch (err) {
      console.error('Error fetching advocates:', err)
    }
  }

  const handleSearchSubmit = () => {
    setSearch(searchInput)
    setPage(1)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }

  useEffect(() => {
    fetchAdvocates(search, specialty, page)
  }, [search, specialty, page])

  const handleReset = () => {
    setSearchInput('')
    setSearch('')
    setSpecialty('')
    setPage(1)
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Solace Advocates
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setSearch(searchInput)
              setPage(1)
            }
          }}
        />
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Filter by Specialty</InputLabel>
          <Select
            value={specialty}
            label="Filter by Specialty"
            onChange={e => {
              setSpecialty(e.target.value)
              setPage(1)
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {specialties.map((s, i) => (
              <MenuItem key={i} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleSearchSubmit} variant="contained">
          Search
        </Button>
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>Specialties</TableCell>
            <TableCell>Years of Experience</TableCell>
            <TableCell>Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {advocates.map((advocate: any, index) => (
            <TableRow key={index}>
              <TableCell>{advocate.firstName}</TableCell>
              <TableCell>{advocate.lastName}</TableCell>
              <TableCell>{advocate.city}</TableCell>
              <TableCell>{advocate.degree}</TableCell>
              <TableCell>
                {(advocate.specialties || []).map((s: string, i: number) => (
                  <Box
                    key={i}
                    component="span"
                    sx={{
                      display: 'inline-block',
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '12px',
                      px: 1,
                      py: 0.5,
                      mr: 0.5,
                      mb: 0.5,
                      fontSize: '0.75rem',
                    }}
                  >
                    {s}
                  </Box>
                ))}
              </TableCell>
              <TableCell>{advocate.yearsOfExperience}</TableCell>
              <TableCell>{advocate.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(totalPages / limit)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  )
}
