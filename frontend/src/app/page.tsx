'use client'

import {
  AppBar,
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
  Toolbar,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { specialties } from './constants'
import { formatPhoneNumber } from './utils'
import SpecialtyTag from './SpecialtyTag'

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

  const handleSearchKeyDown = (e: React.KeyboardEvent<Element>) => {
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
    <Container sx={{ mt: 4, mb: 4 }} maxWidth="xl">
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, mb: 5 }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Solace Advocates
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => {
            handleSearchKeyDown(e)
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
                { <SpecialtyTag name={s} /> }
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
            <TableCell><strong>First Name</strong></TableCell>
            <TableCell><strong>Last Name</strong></TableCell>
            <TableCell><strong>City</strong></TableCell>
            <TableCell><strong>Degree</strong></TableCell>
            <TableCell><strong>Specialties</strong></TableCell>
            <TableCell><strong>Years of Experience</strong></TableCell>
            <TableCell><strong>Phone Number</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {advocates.map((advocate: any, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? 'background.paper' : 'grey.100',
              }}
            >
              <TableCell sx={{ minWidth: 120 }}>{advocate.firstName}</TableCell>
              <TableCell sx={{ minWidth: 120 }}>{advocate.lastName}</TableCell>
              <TableCell sx={{ minWidth: 120 }}>{advocate.city}</TableCell>
              <TableCell sx={{ minWidth: 120 }}>{advocate.degree}</TableCell>
              <TableCell sx={{ minWidth: 300 }}>
                {(advocate.specialties || [])
                .sort()
                .map((s: string, i: number) => (
                  <SpecialtyTag key={i} name={s} />
                ))}
              </TableCell>
              <TableCell sx={{ minWidth: 120 }}>{advocate.yearsOfExperience}</TableCell>
              <TableCell sx={{ minWidth: 140 }}>{formatPhoneNumber(advocate.phoneNumber)}</TableCell>
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
