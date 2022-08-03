import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import ButtonAccion from '../../components/ButtonAccion';
import InputText from '../../components/InputText';
import Modal from '../../components/Modal'
import SelectText from '../../components/SelectText';
import TextAreaText from '../../components/TextAreaText';
import useAlert from '../../hooks/useAlert';

const Form = ({ data, productId, typeForm, close, onSuccess }) => {
    const { alertSuccess } = useAlert()
    const [disabledInput, setDisabledInput] = useState(false);
    const [typeFormSelect, setTypeFormSelect] = useState('');
    const [title, setTitle] = useState('');
    const { handleSubmit, setValue, setError, control, formState: { errors } } = useForm();

    const onSubmit = data => {

        if (data.name === undefined || data.name.length === 0) {
            setError('name', { type: 'custom', message: 'Campo obligatorio' });
            return false
        }

        if (data.description === undefined || data.description.length === 0) {
            setError('description', { type: 'custom', message: 'Campo obligatorio' });
            return false
        }


        if (data.category === undefined || data.category.length === 0) {
            setError('category', { type: 'custom', message: 'Campo obligatorio' });
            return false
        }

        if (data.price === undefined || data.price.length === 0) {
            setError('price', { type: 'custom', message: 'Campo obligatorio' });
            return false
        }

        if (data.avaliable === undefined || data.avaliable.length === 0) {
            setError('avaliable', { type: 'custom', message: 'Campo obligatorio' });
            return false
        }

        if (data.status === undefined || data.status.length === 0) {
            setError('status', { type: 'custom', message: 'Campo obligatorio' });
            return false
        }


        if (typeFormSelect === 'create') {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch(`${process.env.REACT_APP_API_URL}/products`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        alertSuccess('Producto creado con exito.')
                        onSuccess()
                    }
                });
        }

        if (typeFormSelect === 'edit') {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        alertSuccess('Producto editado con exito.')
                        onSuccess()
                    }
                });
        }

    }

    useEffect(() => {
        if (typeForm === 'view' || typeForm === 'edit') {
            if (typeForm === 'view') setDisabledInput(true);
            setValue('name', data.name)
            setValue('description', data.description)
            setValue('category', data.category)
            setValue('price', data.price)
            setValue('avaliable', data.avaliable)
            setValue('status', data.status)
        } else {
            setValue('status', true)

        }


        if (typeForm === 'create') setTitle('Crear Producto');
        if (typeForm === 'view') setTitle('Detalles del Producto');
        if (typeForm === 'edit') setTitle('Editar Producto');

        setTypeFormSelect(typeForm);


    }, [data, typeForm])

    return (
        <Modal title={title} close={close}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { value, onChange } }) => (
                        <InputText className={`${disabledInput ? 'disabled' : ''}`} disabled={disabledInput} defaultValue={value} onChange={onChange} label="Nombre del producto" placeholder="Ingrese nombre del producto" error={errors.name?.message} />)} />

                <Controller
                    control={control}
                    name="description"
                    render={({ field: { value, onChange } }) => (<TextAreaText className={`${disabledInput ? 'disabled' : ''}`} disabled={disabledInput} onChange={onChange} defaultValue={value} label="Descripción del producto" placeholder="Ingrese la descripcio4n del producto" error={errors.description?.message} />)} />

                <Controller
                    control={control}
                    name="category"
                    render={({ field: { value, onChange } }) => (
                        <InputText className={`${disabledInput ? 'disabled' : ''}`} disabled={disabledInput} defaultValue={value} label="Categoria" onChange={onChange} placeholder="Ingrese la categoria" error={errors.category?.message} />)} />

                <Controller
                    control={control}
                    name="price"
                    render={({ field: { value, onChange } }) => (
                        <InputText type="number" className={`${disabledInput ? 'disabled' : ''}`} disabled={disabledInput} label="Precio" defaultValue={value} onChange={onChange} placeholder="Precio" error={errors.category?.message} />)} />

                <Controller
                    control={control}
                    name="avaliable"
                    render={({ field: { value, onChange } }) => (
                        <InputText type="number" className={`${disabledInput ? 'disabled' : ''}`} disabled={disabledInput} label="Disponible" defaultValue={value} onChange={onChange} placeholder="avaliable" error={errors.avaliable?.message} />)} />

                <Controller
                    control={control}
                    name="status"
                    render={({ field: { value = true, onChange } }) => (
                        <SelectText className={`${disabledInput ? 'disabled' : ''}`} disabled={disabledInput} placeholder="Estatus" value={value} onChange={onChange}>
                            <option value={false} >Despublicado</option>
                            <option value={true}>Publicado</option>
                        </SelectText>)} />

                <div style={{ padding: '1em', display: 'flex', justifyContent: 'flex-end' }}>
                    {typeFormSelect === 'create' && <ButtonAccion className="BlueBtn" >Guardar</ButtonAccion>}
                    {typeFormSelect === 'edit' && <ButtonAccion className="BlueBtn" >Actualizar</ButtonAccion>}
                    {typeFormSelect === 'view' && <a className='link' onClick={() => { setTypeFormSelect('edit'); setDisabledInput(false); setTitle('Editar Producto'); }}>Editar Producto</a>}
                </div>
            </form>
        </Modal >
    )
}

export default Form