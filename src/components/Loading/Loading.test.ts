import React from 'react';
import { render } from '@testing-library/react';
import { create } from "react-test-renderer"
import Loading from "./Loading";

describe('Loading', ()=> {
    test('Отрисовка', () => {
        const obj = render( <Loading />);
        const linkElement = obj.getByText(/Loading/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('Проверка наличия тега img', () => {
        const obj = create(<Loading/>).root;
        expect(obj.findAllByType('img').length).toBe(1);
    });

    test('Проверка содержания тега p', () => {
        const obj = create(<Loading/>).root;
        expect(obj.findByType('p').children[2]).toBe('Loading...');
    });

    test('Не должно быть тега input', () => {
        const obj = create(<Loading/>).root;
        expect(obj.findAllByType('input').length).toBe(0);
    });
});

