import React, { useEffect, useRef, useState } from 'react'
import './styles.scss'
import { GrAdd, GrView } from 'react-icons/gr'
import { AiOutlineClear, AiOutlineDelete, AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai'
import { HiFilter } from 'react-icons/hi'
import { BiFilterAlt } from 'react-icons/bi'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import ButtonAccion from '../../components/ButtonAccion'
import InputText from '../../components/InputText'
import SelectText from '../../components/SelectText'
import Form from './Form'
import useAlert from '../../hooks/useAlert'

const Products = () => {
    const { alertSuccess } = useAlert()
    const [products, setProducts] = useState([])
    const [productsAux, setProductsAux] = useState([])
    const [clearFilter, setClearFilter] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [dataForm, setDataForm] = useState(null)
    const [productId, setProductId] = useState(null)
    const [typeForm, setTypeForm] = useState('Create') // Create, Edit, Delete

    const [listCategories, setListCategories] = useState([])
    const searchName = useRef()
    const searchPrecioMin = useRef()
    const searchPrecioMax = useRef()
    const searchCategory = useRef()
    const searchStatus = useRef()

    const [modalCreate, setModalCreate] = useState(false)

    const initDataProducts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        const data = await response.json();
        const resultData = data.slice().sort((a, b) => b.id - a.id);
        setProducts(resultData);
        setProductsAux(resultData)
        const categories = Object.values(data).map(pac => pac.category)
        setListCategories(categories)

    }

    const onChangeFilter = () => {
        const nameFilter = searchName.current.value
        const precioMinFilter = searchPrecioMin.current.value
        const precioMaxFilter = searchPrecioMax.current.value
        const categoryFilter = searchCategory.current.value
        const statusFilter = searchStatus.current.value

        if (nameFilter.length === 0 && precioMinFilter.length === 0 && precioMaxFilter.length === 0 && categoryFilter.length === 0 && statusFilter.length === 0) {
            return false
        }


        let filtroProduct = productsAux;

        if (searchName.current.value.length > 0) {
            filtroProduct = filtroProduct.filter(pac => {
                return (
                    pac.name.toLowerCase().includes(nameFilter.toLowerCase())
                )
            })
        }

        if (searchPrecioMin.current.value.length > 0 && searchPrecioMax.current.value.length > 0) {
            filtroProduct = filtroProduct.filter(pac => {
                return (
                    pac.price >= precioMinFilter && pac.price <= precioMaxFilter
                )
            })
        }

        if (searchCategory.current.value.length > 0) {
            filtroProduct = filtroProduct.filter(pac => {
                return (
                    pac.category.toLowerCase() === categoryFilter.toLowerCase()
                )
            })
        }


        if (searchStatus.current.value.length > 0) {
            filtroProduct = filtroProduct.filter(pac => {
                return (
                    JSON.parse(pac.status) === JSON.parse(statusFilter)
                )
            })
        }

        setClearFilter(true);
        setProducts(filtroProduct)

    }

    const handleModalForm = (data, typeForm) => {
        setDataForm(data)
        setProductId(data.id)
        setTypeForm(typeForm)
        setModalCreate(true)
    }

    const handleClearFilter = () => {
        setProducts(productsAux)
        searchName.current.value = ''
        searchPrecioMin.current.value = ''
        searchPrecioMax.current.value = ''
        searchCategory.current.value = ''
        searchStatus.current.value = ''
        setClearFilter(false)
    }

    const handleSuccess = () => {
        initDataProducts()
        setModalCreate(false)
    }

    const handleDelete = (productId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alertSuccess('Producto eliminado con exito.')
                    handleSuccess()
                }
            });
    }

    useEffect(() => {
        initDataProducts();
    }, [])

    return (
        <>
            <div className="scaffold-layout__main">
                <Card>

                    <div className="cardFiltro">
                        <h1>Catálogo de productos</h1>
                        <div className='option'>
                            <ButtonAccion className="bgGren" onClick={() => handleModalForm([], 'create')}><GrAdd /> Crear nuevo producto</ButtonAccion>
                            <ButtonAccion className="circle" onClick={() => setOpenFilter(!openFilter)}>{openFilter ? <HiFilter /> : <BiFilterAlt />}</ButtonAccion>

                        </div>
                    </div>

                    <div className={`cardFiltro__option ${openFilter ? 'show' : ''}`}>
                        <InputText name="name" placeholder="Nombre del producto" ref={searchName} />
                        <div className='inputGroup'>
                            <InputText name="name" type="number" placeholder="Precio Min" ref={searchPrecioMin} />&nbsp;
                            <InputText name="name" type="number" placeholder="Precio Max" ref={searchPrecioMax} />
                        </div>&nbsp;
                        <SelectText ref={searchCategory} placeholder="Categoria">
                            {listCategories.map(category => <option value={category}>{category}</option>)}
                        </SelectText> &nbsp;

                        <SelectText ref={searchStatus} placeholder="Estatus">
                            <option value={false}>Despublicado</option>
                            <option value={true}>Publicado</option>
                        </SelectText>&nbsp;

                        <ButtonAccion className="bgGren" onClick={onChangeFilter}><AiOutlineSearch /> Buscar</ButtonAccion>
                        {clearFilter && <ButtonAccion className="bgGren" onClick={handleClearFilter}><AiOutlineClear />Limpiar</ButtonAccion>}
                    </div>

                    {products.length === 0 ? <Loading /> : (
                        <table className="table-auto" >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Disponible</th>
                                    <th>Estatus</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length > 0 && products.map((product, index) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td width={160}>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td><span className='bagItemStatus'>{product.category}</span></td>
                                            <td>${product.price}</td>
                                            <td>{product.avaliable}</td>
                                            <td><span className={`bagItemStatus ${JSON.parse(product.status) ? 'active' : 'inactive'}`}>{JSON.parse(product.status) ? 'Publicado' : 'Despublicado'}</span></td>

                                            <td>
                                                <div className='d-flex'>
                                                    <Button onClick={() => handleModalForm(product, 'view')}><GrView /></Button>
                                                    <Button onClick={() => handleModalForm(product, 'edit')}><AiOutlineEdit /></Button>
                                                    <Button onClick={() => handleDelete(product.id)} ><AiOutlineDelete /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )}

                </Card>
            </div>


            {modalCreate && <Form data={dataForm} productId={productId} typeForm={typeForm} close={() => setModalCreate(!modalCreate)} onSuccess={handleSuccess} />}

        </>
    )
}

export default Products