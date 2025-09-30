'use client';
import React, { useState } from 'react';
import { TextInput, rem } from '@mantine/core';
import { LucideSearch, LucideX } from 'lucide-react';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    onChange?: (query: string) => void;
    onClear?: () => void;
}

function SearchBar({ placeholder = 'Busca aquí el producto...', onSearch, onChange, onClear }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(query);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.currentTarget.value;
        setQuery(newQuery);
        if (onChange) {
            onChange(newQuery);
        }
        if (onClear) {
            if (newQuery === '') {
                onClear();
            }
        }
    };

    return (
        <TextInput
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            my={10}
            leftSection={query !== '' ? <LucideX style={{ width: rem(20), height: rem(20), cursor: 'pointer' }}
                strokeWidth={1.5}
                onClick={() => {
                    setQuery('');
                    if (onClear) {
                        onClear();
                    }
                }} /> : undefined}
            rightSection={
                <LucideSearch
                    style={{ width: rem(20), height: rem(20), cursor: 'pointer' }}
                    strokeWidth={1.5}
                    onClick={() => onSearch(query)}
                />
            }
            size="lg"
            radius="xl"
            styles={{
                input: {
                    paddingRight: rem(50),
                    backgroundColor: '#ffffff',
                    border: 'none',
                    boxShadow: 'var(--mantine-shadow-xs)'
                },
            }}
            rightSectionWidth={rem(50)}
        />
    );
}


export function DemoSearchBar() {
    const handleSearch = (q: string) => {
        console.log('Búsqueda ejecutada:', q);
        alert(`Buscando: ${q}`);
    };

    return (
        <div style={{ maxWidth: rem(800), margin: '20px auto', padding: rem(20) }}>
            <SearchBar
                placeholder="Search something sweet on your mind..."
                onSearch={handleSearch}
            // onChange={(q) => console.log('Escribiendo:', q)} // Puedes descomentar para ver el seguimiento en vivo
            />
        </div>
    );
}

export default SearchBar;